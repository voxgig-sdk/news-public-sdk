-- NewsPublic SDK error

local NewsPublicError = {}
NewsPublicError.__index = NewsPublicError


function NewsPublicError.new(code, msg, ctx)
  local self = setmetatable({}, NewsPublicError)
  self.is_sdk_error = true
  self.sdk = "NewsPublic"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NewsPublicError:error()
  return self.msg
end


function NewsPublicError:__tostring()
  return self.msg
end


return NewsPublicError
