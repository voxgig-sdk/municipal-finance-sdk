-- Typed models for the MunicipalFinance SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AgedCreditor
---@field amount_sum? number
---@field amount_type_code? string
---@field amount_type_label? string
---@field demarcation_code? string
---@field demarcation_label? string
---@field financial_period_period? number
---@field financial_year_end_year? number
---@field item_code? string
---@field item_composition? string
---@field item_label? string
---@field item_position_in_return_form? number
---@field item_return_form_structure? string
---@field period_length_length? string

---@class AgedCreditorListMatch
---@field amount_sum? number
---@field amount_type_code? string
---@field amount_type_label? string
---@field demarcation_code? string
---@field demarcation_label? string
---@field financial_period_period? number
---@field financial_year_end_year? number
---@field item_code? string
---@field item_composition? string
---@field item_label? string
---@field item_position_in_return_form? number
---@field item_return_form_structure? string
---@field period_length_length? string

---@class AgedDebtor
---@field amount_sum? number
---@field amount_type_code? string
---@field amount_type_label? string
---@field customer_group_code? string
---@field demarcation_code? string
---@field demarcation_label? string
---@field financial_period_period? number
---@field financial_year_end_year? number
---@field item_code? string
---@field item_composition? string
---@field item_label? string
---@field item_position_in_return_form? number
---@field item_return_form_structure? string
---@field period_length_length? string

---@class AgedDebtorListMatch
---@field amount_sum? number
---@field amount_type_code? string
---@field amount_type_label? string
---@field customer_group_code? string
---@field demarcation_code? string
---@field demarcation_label? string
---@field financial_period_period? number
---@field financial_year_end_year? number
---@field item_code? string
---@field item_composition? string
---@field item_label? string
---@field item_position_in_return_form? number
---@field item_return_form_structure? string
---@field period_length_length? string

---@class Fact
---@field cells? table
---@field summary? table
---@field total_cell_count? number

---@class FactListMatch
---@field cells? table
---@field summary? table
---@field total_cell_count? number

local M = {}

return M
