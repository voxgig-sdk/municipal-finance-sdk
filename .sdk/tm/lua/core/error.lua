-- MunicipalFinance SDK error

local MunicipalFinanceError = {}
MunicipalFinanceError.__index = MunicipalFinanceError


function MunicipalFinanceError.new(code, msg, ctx)
  local self = setmetatable({}, MunicipalFinanceError)
  self.is_sdk_error = true
  self.sdk = "MunicipalFinance"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MunicipalFinanceError:error()
  return self.msg
end


function MunicipalFinanceError:__tostring()
  return self.msg
end


return MunicipalFinanceError
