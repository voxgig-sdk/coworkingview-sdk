# Typed models for the Coworkingview SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ConfigRequired(TypedDict):
    flags: dict
    message: dict
    minSupportedBuild: int


class Config(ConfigRequired, total=False):
    recommendedBuild: int


class ConfigLoadMatch(TypedDict, total=False):
    flags: dict
    message: dict
    minSupportedBuild: int
    recommendedBuild: int


class Facet(TypedDict):
    capacityRange: dict
    facets: list
    priceRange: dict


class FacetLoadMatchRequired(TypedDict):
    locale: str


class FacetLoadMatch(FacetLoadMatchRequired, total=False):
    city: str
    country: str
    currency: str
    operator: str
    pricing_option_type: str
    zone: str


class Geo(TypedDict):
    pass


class GeoLoadMatch(TypedDict):
    locale: str


class Health(TypedDict):
    sha: str
    status: str


class HealthLoadMatch(TypedDict, total=False):
    sha: str
    status: str


class Market(TypedDict):
    pass


class MarketLoadMatchRequired(TypedDict):
    locale: str


class MarketLoadMatch(MarketLoadMatchRequired, total=False):
    city: str
    country: str
    currency: str


class OperatorRequired(TypedDict):
    asOf: str
    cities: list
    faqs: list
    logo: dict
    name: str
    pricePosition: dict
    propertyCount: int
    slug: str


class Operator(OperatorRequired, total=False):
    description: str
    indexabilityBrand: Any
    tagline: str


class OperatorLoadMatch(TypedDict):
    id: str
    locale: str


class PlaceRequired(TypedDict):
    asOf: str
    center: dict
    faqs: list
    kind: str
    name: str
    parent: dict
    priceRange: dict
    propertyCount: int
    slug: str


class Place(PlaceRequired, total=False):
    id: str
    intro: str
    shortDescription: str


class PlaceLoadMatch(TypedDict):
    kind: str
    slug: str
    locale: str


class PropertyRequired(TypedDict):
    address: str
    amenities: list
    city: dict
    coordinates: dict
    description: str
    featured: bool
    fromPrice: dict
    images: list
    marketPosition: dict
    operator: dict
    pricingOptions: list
    slug: str
    title: str
    webUrl: str
    zone: dict


class Property(PropertyRequired, total=False):
    capacity: int
    capacity_status: str
    countryCode: str
    distanceMeters: float
    excerpt: str
    fromBillingPeriod: str
    indexabilityCompleteness: Any
    indexabilityState: Any
    updatedAt: str


class PropertyLoadMatch(TypedDict):
    id: str
    locale: str


class PropertyListMatchRequired(TypedDict):
    locale: str


class PropertyListMatch(PropertyListMatchRequired, total=False):
    address: str
    amenity: str
    bbox: str
    city: str
    country: str
    currency: str
    lat: float
    lng: float
    max_price: float
    min_capacity: int
    min_price: float
    operator: str
    page: int
    page_size: int
    pricing_option_type: str
    radius_meter: float
    seed: int
    sort_by: str
    zone: str


class Search(TypedDict):
    pass


class SearchListMatchRequired(TypedDict):
    locale: str
    q: str


class SearchListMatch(SearchListMatchRequired, total=False):
    limit: int
