package voxgigmunicipalfinancesdk

import (
	"github.com/voxgig-sdk/municipal-finance-sdk/go/core"
	"github.com/voxgig-sdk/municipal-finance-sdk/go/entity"
	"github.com/voxgig-sdk/municipal-finance-sdk/go/feature"
	_ "github.com/voxgig-sdk/municipal-finance-sdk/go/utility"
)

// Type aliases preserve external API.
type MunicipalFinanceSDK = core.MunicipalFinanceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MunicipalFinanceEntity = core.MunicipalFinanceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MunicipalFinanceError = core.MunicipalFinanceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAgedCreditorEntityFunc = func(client *core.MunicipalFinanceSDK, entopts map[string]any) core.MunicipalFinanceEntity {
		return entity.NewAgedCreditorEntity(client, entopts)
	}
	core.NewAgedDebtorEntityFunc = func(client *core.MunicipalFinanceSDK, entopts map[string]any) core.MunicipalFinanceEntity {
		return entity.NewAgedDebtorEntity(client, entopts)
	}
	core.NewFactEntityFunc = func(client *core.MunicipalFinanceSDK, entopts map[string]any) core.MunicipalFinanceEntity {
		return entity.NewFactEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMunicipalFinanceSDK = core.NewMunicipalFinanceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
