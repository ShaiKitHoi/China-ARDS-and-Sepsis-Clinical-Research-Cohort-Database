#!/usr/bin/env python3
"""Serve the SEARCH static site locally without cache and with live reload.

Run this script from any directory. It serves the repository root, so the
relative photo paths used by the research showcase work exactly as they do in
deployment. Every HTML response contains a tiny development-only watcher that
reloads the page after HTML, CSS, JavaScript, or JSON changes.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import os
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent.parent
WATCH_ROOTS = (
    ROOT / "concepts" / "search-research-showcase",
    ROOT / "Co-Team" / "主中心",
    ROOT / "Co-Team" / "分中心",
)
WATCH_SUFFIXES = {".html", ".css", ".js", ".json"}
VERSION_PATH = "/__search_preview_version__"
LIVE_RELOAD = f"""<script>
(() => {{
  let currentVersion = null;
  const poll = async () => {{
    try {{
      const response = await fetch('{VERSION_PATH}', {{ cache: 'no-store' }});
      const {{ version }} = await response.json();
      if (currentVersion && currentVersion !== version) window.location.reload();
      currentVersion = version;
    }} catch (_) {{}}
  }};
  poll();
  window.setInterval(poll, 900);
}})();
</script>""".encode("utf-8")


def source_version() -> str:
    """Return a cheap change marker for page source and displayed portraits."""
    digest = hashlib.sha256()
    for watch_root in WATCH_ROOTS:
        if not watch_root.exists():
            continue
        for directory, _, filenames in os.walk(watch_root):
            for filename in sorted(filenames):
                file_path = Path(directory) / filename
                if watch_root == WATCH_ROOTS[0] and file_path.suffix.lower() not in WATCH_SUFFIXES:
                    continue
                stat = file_path.stat()
                digest.update(str(file_path.relative_to(ROOT)).encode("utf-8"))
                digest.update(str(stat.st_mtime_ns).encode("ascii"))
                digest.update(str(stat.st_size).encode("ascii"))
    return digest.hexdigest()[:16]


class PreviewHandler(SimpleHTTPRequestHandler):
    """Static handler with cache disabling and live-reload injection."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self) -> None:
        request_path = urlparse(self.path).path
        if request_path == VERSION_PATH:
            body = json.dumps({"version": source_version()}).encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        if request_path.endswith(".html"):
            target = (ROOT / unquote(request_path.lstrip("/"))).resolve()
            if ROOT not in target.parents or not target.is_file():
                self.send_error(HTTPStatus.NOT_FOUND, "File not found")
                return
            body = target.read_bytes()
            marker = b"</body>"
            body = body.replace(marker, LIVE_RELOAD + marker, 1) if marker in body else body + LIVE_RELOAD
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()


def main() -> None:
    parser = argparse.ArgumentParser(description="SEARCH 本地实时预览服务器")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址（默认：127.0.0.1）")
    parser.add_argument("--port", default=4176, type=int, help="端口（默认：4176）")
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), PreviewHandler)
    url = f"http://{args.host}:{args.port}/concepts/search-research-showcase/index.html?variant=A"
    print("SEARCH 本地实时预览已启动（按 Ctrl+C 停止）")
    print(f"首页：{url}")
    print(f"合作单位：http://{args.host}:{args.port}/concepts/search-research-showcase/network.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
