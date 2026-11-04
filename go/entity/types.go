// Typed models for the Coworkingview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/coworkingview-sdk/go/core"
)

// Config is the typed data model for the config entity.
type Config struct {
}

// ConfigLoadMatch is the typed request payload for Config.LoadTyped.
type ConfigLoadMatch struct {
	Flags *map[string]any `json:"flags,omitempty"`
	Message *map[string]any `json:"message,omitempty"`
	MinSupportedBuild *int `json:"minSupportedBuild,omitempty"`
	RecommendedBuild *int `json:"recommendedBuild,omitempty"`
}

// Facet is the typed data model for the facet entity.
type Facet struct {
}

// FacetLoadMatch is the typed request payload for Facet.LoadTyped.
type FacetLoadMatch struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Locale string `json:"locale"`
	Operator *string `json:"operator,omitempty"`
	PricingOptionType *string `json:"pricing_option_type,omitempty"`
	Zone *string `json:"zone,omitempty"`
}

// Geo is the typed data model for the geo entity.
type Geo struct {
}

// GeoLoadMatch is the typed request payload for Geo.LoadTyped.
type GeoLoadMatch struct {
	Locale string `json:"locale"`
}

// Health is the typed data model for the health entity.
type Health struct {
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Sha *string `json:"sha,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Market is the typed data model for the market entity.
type Market struct {
}

// MarketLoadMatch is the typed request payload for Market.LoadTyped.
type MarketLoadMatch struct {
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Locale string `json:"locale"`
}

// Operator is the typed data model for the operator entity.
type Operator struct {
}

// OperatorLoadMatch is the typed request payload for Operator.LoadTyped.
type OperatorLoadMatch struct {
	Id string `json:"id"`
	Locale string `json:"locale"`
}

// Place is the typed data model for the place entity.
type Place struct {
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Kind string `json:"kind"`
	Slug string `json:"slug"`
	Locale string `json:"locale"`
}

// Property is the typed data model for the property entity.
type Property struct {
}

// PropertyLoadMatch is the typed request payload for Property.LoadTyped.
type PropertyLoadMatch struct {
	Id string `json:"id"`
	Locale string `json:"locale"`
}

// PropertyListMatch is the typed request payload for Property.ListTyped.
type PropertyListMatch struct {
	Address *string `json:"address,omitempty"`
	Amenity *string `json:"amenity,omitempty"`
	Bbox *string `json:"bbox,omitempty"`
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lng *float64 `json:"lng,omitempty"`
	Locale string `json:"locale"`
	MaxPrice *float64 `json:"max_price,omitempty"`
	MinCapacity *int `json:"min_capacity,omitempty"`
	MinPrice *float64 `json:"min_price,omitempty"`
	Operator *string `json:"operator,omitempty"`
	Page *int `json:"page,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PricingOptionType *string `json:"pricing_option_type,omitempty"`
	RadiusMeter *float64 `json:"radius_meter,omitempty"`
	Seed *int `json:"seed,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	Zone *string `json:"zone,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Locale string `json:"locale"`
	Q string `json:"q"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
