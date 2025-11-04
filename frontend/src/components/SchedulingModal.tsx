import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Clock,
  Repeat,
  X,
  Check,
  Sun,
  Moon,
  Coffee,
  Users,
  TrendingUp,
} from "lucide-react";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (scheduleData: any) => void;
  campaignTitle: string;
}

export function SchedulingModal({
  isOpen,
  onClose,
  onSchedule,
  campaignTitle,
}: SchedulingModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [repeatOption, setRepeatOption] = useState("once");
  const [useOptimalTiming, setUseOptimalTiming] = useState(true);

  if (!isOpen) return null;

  const optimalTimes = [
    {
      time: "08:00",
      period: "Morning",
      icon: <Coffee className="w-4 h-4" />,
      engagement: "High",
      reason: "Commute time",
    },
    {
      time: "12:00",
      period: "Lunch",
      icon: <Sun className="w-4 h-4" />,
      engagement: "Peak",
      reason: "Lunch break scrolling",
    },
    {
      time: "17:30",
      period: "Evening",
      icon: <Users className="w-4 h-4" />,
      engagement: "High",
      reason: "After-work wind down",
    },
    {
      time: "19:00",
      period: "Prime",
      icon: <TrendingUp className="w-4 h-4" />,
      engagement: "Peak",
      reason: "Peak social time",
    },
    {
      time: "21:00",
      period: "Night",
      icon: <Moon className="w-4 h-4" />,
      engagement: "Medium",
      reason: "Evening leisure",
    },
  ];

  const repeatOptions = [
    {
      value: "once",
      label: "Post once",
      description: "Single post at scheduled time",
    },
    {
      value: "daily",
      label: "Daily",
      description: "Post every day at this time",
    },
    {
      value: "weekly",
      label: "Weekly",
      description: "Post weekly on the same day",
    },
    { value: "custom", label: "Custom", description: "Set your own schedule" },
  ];

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSchedule = () => {
    const scheduleData = {
      date: selectedDate || getTomorrowDate(),
      time: selectedTime || "12:00",
      repeat: repeatOption,
      useOptimalTiming,
      campaignTitle,
    };
    onSchedule(scheduleData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Schedule Campaign</CardTitle>
              <CardDescription className="mt-1">
                "{campaignTitle}"
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* AI Optimal Timing Toggle */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-green-800">
                    AI Optimal Timing
                  </span>
                </div>
                <Button
                  variant={useOptimalTiming ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseOptimalTiming(!useOptimalTiming)}
                  className={
                    useOptimalTiming
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-300 text-green-700 hover:bg-green-50"
                  }
                >
                  {useOptimalTiming ? <Check className="w-4 h-4 mr-1" /> : null}
                  {useOptimalTiming ? "Enabled" : "Enable"}
                </Button>
              </div>
              <p className="text-sm text-green-700">
                {useOptimalTiming
                  ? "We'll automatically post at the best time for your audience engagement"
                  : "Choose your own posting time below"}
              </p>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getTomorrowDate()}
              className="w-full"
            />
          </div>

          {/* Time Selection */}
          {!useOptimalTiming && (
            <div className="space-y-3">
              <Label>Time</Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {optimalTimes.map((timeSlot) => (
                  <label
                    key={timeSlot.time}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTime === timeSlot.time
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={timeSlot.time}
                      checked={selectedTime === timeSlot.time}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        {timeSlot.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{timeSlot.time}</span>
                          <span className="text-sm text-muted-foreground">
                            {timeSlot.period}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              timeSlot.engagement === "Peak"
                                ? "border-green-300 text-green-700 bg-green-50"
                                : timeSlot.engagement === "High"
                                  ? "border-blue-300 text-blue-700 bg-blue-50"
                                  : "border-gray-300 text-gray-700 bg-gray-50"
                            }`}
                          >
                            {timeSlot.engagement}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {timeSlot.reason}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Repeat Options */}
          <div className="space-y-3">
            <Label>Frequency</Label>
            <div className="space-y-2">
              {repeatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    repeatOption === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="repeat"
                    value={option.value}
                    checked={repeatOption === option.value}
                    onChange={(e) => setRepeatOption(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <Repeat className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{option.label}</span>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Preview */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-800 mb-2">
                Schedule Preview
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>📅 Date: {selectedDate || getTomorrowDate()}</p>
                <p>
                  ⏰ Time:{" "}
                  {useOptimalTiming
                    ? "AI Optimised (likely 12:00-19:00)"
                    : selectedTime || "12:00"}
                </p>
                <p>
                  🔄 Frequency:{" "}
                  {
                    repeatOptions.find((opt) => opt.value === repeatOption)
                      ?.label
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
