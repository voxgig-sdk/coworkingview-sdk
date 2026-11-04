package voxgigcoworkingviewsdk

import (
	"github.com/voxgig-sdk/coworkingview-sdk/go/core"
	"github.com/voxgig-sdk/coworkingview-sdk/go/entity"
	"github.com/voxgig-sdk/coworkingview-sdk/go/feature"
	_ "github.com/voxgig-sdk/coworkingview-sdk/go/utility"
)

// Type aliases preserve external API.
type CoworkingviewSDK = core.CoworkingviewSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CoworkingviewEntityBase = core.CoworkingviewEntityBase

// Deprecated: use CoworkingviewEntityBase.
type CoworkingviewEntity = core.CoworkingviewEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CoworkingviewError = core.CoworkingviewError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewConfigEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewConfigEntity(client, entopts)
	}
	core.NewFacetEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewFacetEntity(client, entopts)
	}
	core.NewGeoEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewGeoEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewMarketEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewMarketEntity(client, entopts)
	}
	core.NewOperatorEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewOperatorEntity(client, entopts)
	}
	core.NewPlaceEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewPlaceEntity(client, entopts)
	}
	core.NewPropertyEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewPropertyEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.CoworkingviewSDK, entopts map[string]any) core.CoworkingviewEntityBase {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCoworkingviewSDK = core.NewCoworkingviewSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCoworkingviewSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CoworkingviewSDK  { return NewCoworkingviewSDK(nil) }
func Test() *CoworkingviewSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
