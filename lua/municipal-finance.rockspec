package = "voxgig-sdk-municipal-finance"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/municipal-finance-sdk.git",
  tag = "lua/v0.0.1",
  dir = "municipal-finance-sdk/lua"
}
description = {
  summary = "MunicipalFinance SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["municipal-finance_sdk"] = "municipal-finance_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
