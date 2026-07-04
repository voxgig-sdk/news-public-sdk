# Typed models for the NewsPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Noticia:
    description: str
    image: str
    link: str
    site_icon: str
    title: str


@dataclass
class NoticiaListMatch:
    description: Optional[str] = None
    image: Optional[str] = None
    link: Optional[str] = None
    site_icon: Optional[str] = None
    title: Optional[str] = None

