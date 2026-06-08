class Rack::Attack
  Rack::Attack.cache.store = Rails.cache

  throttle("logins/ip", limit: 10, period: 300.seconds) do |req|
    if req.path == "/api/v1/sessions" && req.post?
      req.ip
    end
  end

  throttle("api/global", limit: 30, period: 10.seconds) do |req|
    req.ip
  end

  self.throttled_responder = lambda do |request_env|
    [
      429,
      { "Content-Type" => "application/json" },
      [ { error: "Rate limit exceeded. Please try again shortly. " }.to_json ]
    ]
  end
end
