
import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Calendar = () => {
  // Mock data for calendar events
  const events = [
    {
      id: 'e1',
      title: 'Python Basics Assignment Due',
      date: '2023-09-22',
      course: 'Introduction to Computer Science',
      color: '#4285F4',
    },
    {
      id: 'e2',
      title: 'Business Case Study Presentation',
      date: '2023-09-25',
      course: 'Business Administration',
      color: '#0F9D58',
    },
    {
      id: 'e3',
      title: 'Data Structures Implementation Due',
      date: '2023-10-05',
      course: 'Introduction to Computer Science',
      color: '#4285F4',
    },
    {
      id: 'e4',
      title: 'Financial Report Analysis',
      date: '2023-09-28',
      course: 'Financial Accounting',
      color: '#DB4437',
    },
  ];
  
  // Days of the week for header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Current month data (would be dynamic in a real app)
  const currentMonth = 'September 2023';
  
  // Generate calendar days (simplified version - would be dynamic in real app)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 4; // Start September on Friday (offset by 4)
    return {
      day: day > 0 && day <= 30 ? day : null,
      isCurrentMonth: day > 0 && day <= 30,
      isToday: day === 15, // Assuming today is September 15
      events: events.filter(event => {
        const eventDay = new Date(event.date).getDate();
        return eventDay === day;
      }),
    };
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Month</span>
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Month</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{currentMonth}</CardTitle>
                    <Button variant="ghost" size="sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      View Options
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-px bg-muted text-center">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="py-2 font-medium text-sm">
                        {day}
                      </div>
                    ))}
                    
                    {calendarDays.map((day, idx) => (
                      <div
                        key={idx}
                        className={`min-h-[80px] p-1 border border-border ${
                          !day.isCurrentMonth ? 'bg-muted/50 text-muted-foreground' : 
                          day.isToday ? 'bg-primary/5 border-primary/50' : ''
                        }`}
                      >
                        {day.day !== null && (
                          <>
                            <div className={`text-right p-1 ${day.isToday ? 'font-bold' : ''}`}>
                              {day.day}
                            </div>
                            <div className="space-y-1">
                              {day.events.map((event) => (
                                <div
                                  key={event.id}
                                  className="text-xs p-1 truncate rounded"
                                  style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="w-10 text-center">
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-lg font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: event.color, color: event.color }}
                            >
                              {event.course}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
