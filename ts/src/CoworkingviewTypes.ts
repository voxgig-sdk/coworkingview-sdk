// Typed models for the Coworkingview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Config {
  flags: Record<string, any>
  message: Record<string, any>
  minSupportedBuild: number
  recommendedBuild?: number
}

export interface ConfigLoadMatch {
  flags?: Record<string, any>
  message?: Record<string, any>
  minSupportedBuild?: number
  recommendedBuild?: number
}

export interface Facet {
  capacityRange: Record<string, any>
  facets: any[]
  priceRange: Record<string, any>
}

export interface FacetLoadMatch {
  city?: string
  country?: string
  currency?: string
  locale: string
  operator?: string
  pricing_option_type?: string
  zone?: string
}

export interface Geo {
}

export interface GeoLoadMatch {
  locale: string

  // Selects a custom action instead of the plain load:
  //   'bootstrap'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Health {
  sha: string
  status: string
}

export interface HealthLoadMatch {
  sha?: string
  status?: string
}

export interface Market {
}

export interface MarketLoadMatch {
  city?: string
  country?: string
  currency?: string
  locale: string

  // Selects a custom action instead of the plain load:
  //   'rate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Operator {
  asOf: string
  cities: any[]
  description?: string
  faqs: any[]
  indexabilityBrand?: any
  logo: Record<string, any>
  name: string
  pricePosition: Record<string, any>
  propertyCount: number
  slug: string
  tagline?: string
}

export interface OperatorLoadMatch {
  id: string
  locale: string
}

export interface Place {
  asOf: string
  center: Record<string, any>
  faqs: any[]
  id?: string
  intro?: string
  kind: string
  name: string
  parent: Record<string, any>
  priceRange: Record<string, any>
  propertyCount: number
  shortDescription?: string
  slug: string
}

export interface PlaceLoadMatch {
  kind: string
  slug: string
  locale: string
}

export interface Property {
  address: string
  amenities: any[]
  capacity?: number
  capacity_status?: string
  city: Record<string, any>
  coordinates: Record<string, any>
  countryCode?: string
  description: string
  distanceMeters?: number
  excerpt?: string
  featured: boolean
  fromBillingPeriod?: string
  fromPrice: Record<string, any>
  images: any[]
  indexabilityCompleteness?: any
  indexabilityState?: any
  marketPosition: Record<string, any>
  operator: Record<string, any>
  pricingOptions: any[]
  slug: string
  title: string
  updatedAt?: string
  webUrl: string
  zone: Record<string, any>
}

export interface PropertyLoadMatch {
  id: string
  locale: string
}

export interface PropertyListMatch {
  address?: string
  amenity?: string
  bbox?: string
  city?: string
  country?: string
  currency?: string
  lat?: number
  lng?: number
  locale: string
  max_price?: number
  min_capacity?: number
  min_price?: number
  operator?: string
  page?: number
  page_size?: number
  pricing_option_type?: string
  radius_meter?: number
  seed?: number
  sort_by?: string
  zone?: string

  // Selects a custom action instead of the plain list:
  //   'map'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Search {
}

export interface SearchListMatch {
  limit?: number
  locale: string
  q: string

  // Selects a custom action instead of the plain list:
  //   'suggest'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

