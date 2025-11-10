const axios = require('axios')

class AIServiceClient {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL || 'http://localhost:8000'
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds timeout for AI operations
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add request interceptor for authentication if needed
    this.client.interceptors.request.use((config) => {
      // Add API key or JWT token if required
      const apiKey = process.env.AI_SERVICE_API_KEY
      if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`
      }
      return config
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('AI Service Error:', error.response?.data || error.message)
        throw error
      }
    )
  }

  // Budget Optimization
  async optimizeBudget(campaignData, historicalData) {
    try {
      const response = await this.client.post('/api/v1/budget/optimize', {
        campaign: campaignData,
        historical_performance: historicalData,
        constraints: {
          max_budget_increase: 0.5, // 50% max increase
          min_budget_decrease: 0.1  // 10% min decrease
        }
      })
      return response.data
    } catch (error) {
      console.error('Budget optimization failed:', error.message)
      throw new Error('Budget optimization service unavailable')
    }
  }

  // Content Generation
  async generateAdContent(campaignObjective, targetAudience, platform) {
    try {
      const response = await this.client.post('/api/v1/content/generate', {
        objective: campaignObjective,
        audience: targetAudience,
        platform: platform,
        tone: 'professional',
        max_length: 125 // Facebook ad character limit
      })
      return response.data
    } catch (error) {
      console.error('Content generation failed:', error.message)
      throw new Error('Content generation service unavailable')
    }
  }

  // A/B Test Analysis
  async analyzeABTest(variants, performanceData) {
    try {
      const response = await this.client.post('/api/v1/ab-test/analyze', {
        variants: variants,
        performance: performanceData,
        confidence_level: 0.95
      })
      return response.data
    } catch (error) {
      console.error('A/B test analysis failed:', error.message)
      throw new Error('A/B test analysis service unavailable')
    }
  }

  // Campaign Performance Prediction
  async predictPerformance(campaignData, marketData) {
    try {
      const response = await this.client.post('/api/v1/predict/performance', {
        campaign: campaignData,
        market_conditions: marketData,
        prediction_horizon: 30 // days
      })
      return response.data
    } catch (error) {
      console.error('Performance prediction failed:', error.message)
      throw new Error('Performance prediction service unavailable')
    }
  }

  // Audience Insights
  async getAudienceInsights(audienceData, campaignHistory) {
    try {
      const response = await this.client.post('/api/v1/audience/insights', {
        audience: audienceData,
        campaign_history: campaignHistory
      })
      return response.data
    } catch (error) {
      console.error('Audience insights failed:', error.message)
      throw new Error('Audience insights service unavailable')
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.client.get('/health')
      return response.data
    } catch (error) {
      return { status: 'unhealthy', error: error.message }
    }
  }
}

// Export singleton instance
module.exports = new AIServiceClient()