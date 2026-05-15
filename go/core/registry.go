package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAgedCreditorEntityFunc func(client *MunicipalFinanceSDK, entopts map[string]any) MunicipalFinanceEntity

var NewAgedDebtorEntityFunc func(client *MunicipalFinanceSDK, entopts map[string]any) MunicipalFinanceEntity

var NewFactEntityFunc func(client *MunicipalFinanceSDK, entopts map[string]any) MunicipalFinanceEntity

