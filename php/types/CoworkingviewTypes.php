<?php
declare(strict_types=1);

// Typed models for the Coworkingview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Config entity data model. */
class Config
{
    public array $flags;
    public array $message;
    public int $minSupportedBuild;
    public ?int $recommendedBuild = null;
}

/** Request payload for Config#load. */
class ConfigLoadMatch
{
    public ?array $flags = null;
    public ?array $message = null;
    public ?int $minSupportedBuild = null;
    public ?int $recommendedBuild = null;
}

/** Facet entity data model. */
class Facet
{
    public array $capacityRange;
    public array $facets;
    public array $priceRange;
}

/** Request payload for Facet#load. */
class FacetLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $currency = null;
    public string $locale;
    public ?string $operator = null;
    public ?string $pricing_option_type = null;
    public ?string $zone = null;
}

/** Geo entity data model. */
class Geo
{
}

/** Request payload for Geo#load. */
class GeoLoadMatch
{
    public string $locale;
}

/** Health entity data model. */
class Health
{
    public string $sha;
    public string $status;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?string $sha = null;
    public ?string $status = null;
}

/** Market entity data model. */
class Market
{
}

/** Request payload for Market#load. */
class MarketLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $currency = null;
    public string $locale;
}

/** Operator entity data model. */
class Operator
{
    public string $asOf;
    public array $cities;
    public ?string $description = null;
    public array $faqs;
    public mixed $indexabilityBrand = null;
    public array $logo;
    public string $name;
    public array $pricePosition;
    public int $propertyCount;
    public string $slug;
    public ?string $tagline = null;
}

/** Request payload for Operator#load. */
class OperatorLoadMatch
{
    public string $id;
    public string $locale;
}

/** Place entity data model. */
class Place
{
    public string $asOf;
    public array $center;
    public array $faqs;
    public ?string $id = null;
    public ?string $intro = null;
    public string $kind;
    public string $name;
    public array $parent;
    public array $priceRange;
    public int $propertyCount;
    public ?string $shortDescription = null;
    public string $slug;
}

/** Request payload for Place#load. */
class PlaceLoadMatch
{
    public string $kind;
    public string $slug;
    public string $locale;
}

/** Property entity data model. */
class Property
{
    public string $address;
    public array $amenities;
    public ?int $capacity = null;
    public ?string $capacity_status = null;
    public array $city;
    public array $coordinates;
    public ?string $countryCode = null;
    public string $description;
    public ?float $distanceMeters = null;
    public ?string $excerpt = null;
    public bool $featured;
    public ?string $fromBillingPeriod = null;
    public array $fromPrice;
    public array $images;
    public mixed $indexabilityCompleteness = null;
    public mixed $indexabilityState = null;
    public array $marketPosition;
    public array $operator;
    public array $pricingOptions;
    public string $slug;
    public string $title;
    public ?string $updatedAt = null;
    public string $webUrl;
    public array $zone;
}

/** Request payload for Property#load. */
class PropertyLoadMatch
{
    public string $id;
    public string $locale;
}

/** Request payload for Property#list. */
class PropertyListMatch
{
    public ?string $address = null;
    public ?string $amenity = null;
    public ?string $bbox = null;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $currency = null;
    public ?float $lat = null;
    public ?float $lng = null;
    public string $locale;
    public ?float $max_price = null;
    public ?int $min_capacity = null;
    public ?float $min_price = null;
    public ?string $operator = null;
    public ?int $page = null;
    public ?int $page_size = null;
    public ?string $pricing_option_type = null;
    public ?float $radius_meter = null;
    public ?int $seed = null;
    public ?string $sort_by = null;
    public ?string $zone = null;
}

/** Search entity data model. */
class Search
{
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?int $limit = null;
    public string $locale;
    public string $q;
}

