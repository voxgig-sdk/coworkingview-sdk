package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewConfigEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewFacetEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewGeoEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewHealthEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewMarketEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewOperatorEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewPlaceEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewPropertyEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

var NewSearchEntityFunc func(client *CoworkingviewSDK, entopts map[string]any) CoworkingviewEntityBase

