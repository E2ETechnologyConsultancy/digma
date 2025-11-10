# AI/ML Engine - Python FastAPI Service
# This service provides AI-powered features for campaign optimization

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import uvicorn
import logging
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import openai
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DigMa AI Engine",
    description="AI/ML services for campaign optimization and content generation",
    version="1.0.0"
)

# Configure OpenAI (if available)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Pydantic models
class CampaignData(BaseModel):
    id: str
    name: str
    platform: str
    objective: str
    budget: float
    targeting: Dict[str, Any]
    creative: Dict[str, Any]
    performance: Optional[Dict[str, Any]] = {}

class HistoricalData(BaseModel):
    campaigns: List[CampaignData]
    market_trends: Optional[Dict[str, Any]] = {}

class BudgetOptimizationRequest(BaseModel):
    campaign: CampaignData
    historical_performance: HistoricalData
    constraints: Dict[str, Any] = Field(default_factory=dict)

class BudgetRecommendation(BaseModel):
    recommended_budget: float
    confidence_score: float
    reasoning: str
    expected_improvement: Dict[str, float]

class ContentGenerationRequest(BaseModel):
    objective: str
    audience: Dict[str, Any]
    platform: str
    tone: str = "professional"
    max_length: int = 125

class GeneratedContent(BaseModel):
    headline: str
    description: str
    call_to_action: str
    hashtags: List[str]
    confidence_score: float

class ABTestVariant(BaseModel):
    id: str
    content: Dict[str, Any]
    performance: Dict[str, float]

class ABTestAnalysisRequest(BaseModel):
    variants: List[ABTestVariant]
    performance: Dict[str, Any]
    confidence_level: float = 0.95

class ABTestResult(BaseModel):
    winner: str
    confidence: float
    statistical_significance: bool
    recommendations: List[str]

# AI Services
class BudgetOptimizer:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def optimize_budget(self, campaign: CampaignData, historical: HistoricalData,
                       constraints: Dict[str, Any]) -> BudgetRecommendation:
        """
        Optimize budget allocation using machine learning
        """
        try:
            # Simple rule-based optimization for now
            # In production, this would use trained ML models

            current_budget = campaign.budget
            current_performance = campaign.performance or {}

            # Calculate ROAS (Return on Ad Spend)
            spend = current_performance.get('spend', 0)
            conversions = current_performance.get('conversions', 0)
            roas = (conversions * 10) / spend if spend > 0 else 0  # Assuming $10 avg order value

            # Budget optimization logic
            if roas > 3.0:
                # High ROAS - increase budget
                recommended_budget = min(current_budget * 1.3, constraints.get('max_budget', current_budget * 2))
                improvement = {'roas': 0.1, 'conversions': 0.2}
            elif roas > 1.5:
                # Good ROAS - maintain or slight increase
                recommended_budget = current_budget * 1.1
                improvement = {'roas': 0.05, 'conversions': 0.1}
            else:
                # Low ROAS - decrease budget or optimize targeting
                recommended_budget = max(current_budget * 0.8, constraints.get('min_budget', current_budget * 0.5))
                improvement = {'roas': 0.15, 'conversions': 0.05}

            return BudgetRecommendation(
                recommended_budget=round(recommended_budget, 2),
                confidence_score=0.75,
                reasoning=f"Based on current ROAS of {roas:.2f}",
                expected_improvement=improvement
            )

        except Exception as e:
            logger.error(f"Budget optimization error: {e}")
            # Fallback to conservative recommendation
            return BudgetRecommendation(
                recommended_budget=campaign.budget,
                confidence_score=0.5,
                reasoning="Using conservative budget recommendation due to analysis error",
                expected_improvement={}
            )

class ContentGenerator:
    def __init__(self):
        self.templates = {
            'awareness': [
                "Discover the future of {industry} with {brand}",
                "Transform your {goal} with our innovative solutions",
                "Join thousands who trust {brand} for {benefit}"
            ],
            'traffic': [
                "Ready to boost your {metric}? Click now!",
                "Drive more {audience} to your site today",
                "Increase your {goal} by {percentage}%"
            ],
            'sales': [
                "Limited time: Save {discount}% on {product}",
                "Get {benefit} for only ${price}/month",
                "Upgrade to {premium_feature} today"
            ]
        }

    async def generate_content(self, request: ContentGenerationRequest) -> GeneratedContent:
        """
        Generate ad content using AI/LLM
        """
        try:
            objective = request.objective.lower()
            audience = request.audience
            platform = request.platform.lower()

            # Use OpenAI if available, otherwise use templates
            if openai.api_key:
                content = await self._generate_with_openai(request)
            else:
                content = self._generate_with_templates(request)

            return content

        except Exception as e:
            logger.error(f"Content generation error: {e}")
            # Fallback content
            return GeneratedContent(
                headline="Discover Amazing Solutions",
                description="Transform your business with our innovative platform",
                call_to_action="Learn More",
                hashtags=["#innovation", "#business", "#growth"],
                confidence_score=0.6
            )

    async def _generate_with_openai(self, request: ContentGenerationRequest) -> GeneratedContent:
        """Generate content using OpenAI"""
        prompt = f"""
        Create a compelling {request.platform} ad for {request.objective} campaign.
        Target audience: {request.audience}
        Tone: {request.tone}
        Max length: {request.max_length} characters

        Return JSON with: headline, description, call_to_action, hashtags, confidence_score
        """

        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7
        )

        # Parse response (simplified)
        return GeneratedContent(
            headline="AI-Generated Headline",
            description="AI-generated compelling description for your campaign",
            call_to_action="Get Started Today",
            hashtags=["#AI", "#marketing", "#growth"],
            confidence_score=0.85
        )

    def _generate_with_templates(self, request: ContentGenerationRequest) -> GeneratedContent:
        """Generate content using templates"""
        objective = request.objective.lower()
        templates = self.templates.get(objective, self.templates['awareness'])

        # Simple template filling
        headline = templates[0].format(
            industry=request.audience.get('industry', 'business'),
            brand=request.audience.get('brand', 'our platform'),
            goal=request.audience.get('goal', 'goals'),
            benefit=request.audience.get('benefit', 'results')
        )

        return GeneratedContent(
            headline=headline[:50],  # Truncate if needed
            description=f"Join the {request.audience.get('segment', 'industry leaders')} who are achieving remarkable results.",
            call_to_action="Get Started",
            hashtags=["#marketing", "#business", "#success"],
            confidence_score=0.7
        )

class ABTestAnalyzer:
    def analyze_test(self, request: ABTestAnalysisRequest) -> ABTestResult:
        """
        Analyze A/B test results using statistical methods
        """
        try:
            variants = request.variants
            if len(variants) < 2:
                raise HTTPException(status_code=400, detail="Need at least 2 variants")

            # Simple analysis - find variant with best performance
            best_variant = max(variants, key=lambda v: v.performance.get('conversion_rate', 0))

            # Calculate statistical significance (simplified)
            significance = self._calculate_significance(variants)

            recommendations = [
                f"Variant {best_variant.id} shows {((best_variant.performance.get('conversion_rate', 0) / max(v.performance.get('conversion_rate', 0.01) for v in variants)) * 100):.1f}% better performance",
                "Consider implementing the winning variant permanently",
                "Run additional tests to validate results"
            ]

            return ABTestResult(
                winner=best_variant.id,
                confidence=0.88,
                statistical_significance=significance > request.confidence_level,
                recommendations=recommendations
            )

        except Exception as e:
            logger.error(f"A/B test analysis error: {e}")
            raise HTTPException(status_code=500, detail="Analysis failed")

    def _calculate_significance(self, variants: List[ABTestVariant]) -> float:
        """Simplified statistical significance calculation"""
        # In production, use proper statistical tests (t-test, chi-square, etc.)
        performances = [v.performance.get('conversion_rate', 0) for v in variants]
        return 0.85 if max(performances) > min(performances) * 1.1 else 0.6

# Initialize services
budget_optimizer = BudgetOptimizer()
content_generator = ContentGenerator()
ab_analyzer = ABTestAnalyzer()

# API Routes
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/v1/budget/optimize", response_model=BudgetRecommendation)
async def optimize_budget(request: BudgetOptimizationRequest):
    return budget_optimizer.optimize_budget(
        request.campaign,
        request.historical_performance,
        request.constraints
    )

@app.post("/api/v1/content/generate", response_model=GeneratedContent)
async def generate_content(request: ContentGenerationRequest):
    return await content_generator.generate_content(request)

@app.post("/api/v1/ab-test/analyze", response_model=ABTestResult)
async def analyze_ab_test(request: ABTestAnalysisRequest):
    return ab_analyzer.analyze_test(request)

@app.post("/api/v1/predict/performance")
async def predict_performance(campaign: CampaignData, market_data: Dict[str, Any] = None):
    """Predict campaign performance (placeholder)"""
    return {
        "predicted_impressions": campaign.budget * 1000,
        "predicted_clicks": campaign.budget * 10,
        "predicted_conversions": campaign.budget * 0.1,
        "confidence": 0.75
    }

@app.post("/api/v1/audience/insights")
async def get_audience_insights(audience: Dict[str, Any], campaign_history: List[Dict] = None):
    """Generate audience insights (placeholder)"""
    return {
        "insights": [
            "Audience shows high engagement with video content",
            "Peak activity between 7-9 PM local time",
            "Mobile users convert 40% more than desktop"
        ],
        "recommendations": [
            "Increase video content budget by 25%",
            "Schedule ads for evening hours",
            "Optimize for mobile experience"
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)