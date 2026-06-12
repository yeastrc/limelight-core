#!/usr/bin/env bash
set -euo pipefail

# Build all of Limelight inside the official build image.
#
# Run as your NORMAL user — sudo is applied only to the docker command.
# Also safe if accidentally invoked as `sudo ./build_in_docker.sh`.
#
# Artifacts are written into the directory this script lives in, owned by you
# (not root). Put a copy of the repo in a throwaway dir and run it there if you
# want your canonical checkout left pristine — it always builds its own dir.

IMAGE="ghcr.io/yeastrc/limelight-build-docker:latest"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Resolve the REAL invoking user, even if the script itself was run under sudo.
REAL_USER="${SUDO_USER:-${USER:-$(id -un)}}"
REAL_UID="$(id -u "$REAL_USER")"
REAL_GID="$(id -g "$REAL_USER")"
REAL_HOME="$(getent passwd "$REAL_USER" | cut -d: -f6)"

# Reuse your EXISTING host Gradle + npm caches so dependencies aren't
# re-downloaded. We resolve where they REALLY live on the host (readlink -f
# follows symlinks like ~/.gradle -> /data/...; for a plain ~/.gradle it just
# returns that path), then mount them to a fixed in-container HOME below.
# So this works whether or not the user has those dirs symlinked elsewhere.
HOST_GRADLE_CACHE="$(readlink -f "${GRADLE_USER_HOME:-$REAL_HOME/.gradle}")"
HOST_NPM_CACHE="$(readlink -f "${NPM_CONFIG_CACHE:-$REAL_HOME/.npm}")"
# Create them BEFORE the bind mount, so docker doesn't auto-create them root-owned.
mkdir -p "$HOST_GRADLE_CACHE" "$HOST_NPM_CACHE"
# If the script was run as root (sudo), keep the cache dirs owned by you.
if [ "$(id -u)" -eq 0 ]; then
  chown "$REAL_UID:$REAL_GID" "$HOST_GRADLE_CACHE" "$HOST_NPM_CACHE"
fi

# Fixed, writable in-container HOME. The host caches (wherever they really
# live) are mounted onto the conventional ~/.gradle and ~/.npm under it, so
# the in-container paths are stable and independent of the host layout.
# /tmp already exists and is world-writable for any --user uid, so HOME-direct
# writes work and there is no root-owned-HOME problem.
CONTAINER_HOME="/tmp"

exec sudo docker run --rm \
  --user "$REAL_UID:$REAL_GID" \
  -e HOME="$CONTAINER_HOME" \
  -e GRADLE_USER_HOME="$CONTAINER_HOME/.gradle" \
  -e npm_config_cache="$CONTAINER_HOME/.npm" \
  -v "$REPO_DIR:/work" \
  -v "$HOST_GRADLE_CACHE:$CONTAINER_HOME/.gradle" \
  -v "$HOST_NPM_CACHE:$CONTAINER_HOME/.npm" \
  -w /work \
  "$IMAGE" \
  ant -f ant__build_all_limelight.xml
