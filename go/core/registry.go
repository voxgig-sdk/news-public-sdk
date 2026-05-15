package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewNoticiaEntityFunc func(client *NewsPublicSDK, entopts map[string]any) NewsPublicEntity

