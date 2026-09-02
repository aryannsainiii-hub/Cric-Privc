import { Venue } from '../types/match';

export const venues: Venue[] = [
  { id: 'wankhede', name: 'Wankhede Stadium', city: 'Mumbai', avgFirstInningsScore: 176, avgSecondInningsScore: 168, battingFriendliness: 82, paceAssistance: 63, spinAssistance: 48, chasingAdvantage: 57, pitchType: 'Batting-friendly', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Low' },
  { id: 'chepauk', name: 'MA Chidambaram Stadium', city: 'Chennai', avgFirstInningsScore: 162, avgSecondInningsScore: 150, battingFriendliness: 58, paceAssistance: 40, spinAssistance: 78, chasingAdvantage: 38, pitchType: 'Bowling-friendly', surface: 'Dry', paceBounce: 'Low', spinTurn: 'High' },
  { id: 'chinnaswamy', name: 'M. Chinnaswamy Stadium', city: 'Bengaluru', avgFirstInningsScore: 184, avgSecondInningsScore: 172, battingFriendliness: 88, paceAssistance: 45, spinAssistance: 42, chasingAdvantage: 61, pitchType: 'Batting-friendly', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Low' },
  { id: 'eden', name: 'Eden Gardens', city: 'Kolkata', avgFirstInningsScore: 170, avgSecondInningsScore: 160, battingFriendliness: 70, paceAssistance: 55, spinAssistance: 60, chasingAdvantage: 52, pitchType: 'Balanced', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Medium' },
  { id: 'sawaimansingh', name: 'Sawai Mansingh Stadium', city: 'Jaipur', avgFirstInningsScore: 174, avgSecondInningsScore: 165, battingFriendliness: 75, paceAssistance: 50, spinAssistance: 55, chasingAdvantage: 55, pitchType: 'Balanced', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Medium' },
  { id: 'arun-jaitley', name: 'Arun Jaitley Stadium', city: 'Delhi', avgFirstInningsScore: 168, avgSecondInningsScore: 158, battingFriendliness: 66, paceAssistance: 52, spinAssistance: 58, chasingAdvantage: 47, pitchType: 'Balanced', surface: 'Dry', paceBounce: 'Medium', spinTurn: 'Medium' },
  { id: 'mullanpur', name: 'Maharaja Yadavindra Singh Stadium', city: 'Mullanpur', avgFirstInningsScore: 178, avgSecondInningsScore: 169, battingFriendliness: 80, paceAssistance: 58, spinAssistance: 44, chasingAdvantage: 60, pitchType: 'Batting-friendly', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Low' },
  { id: 'uppal', name: 'Rajiv Gandhi International Stadium', city: 'Hyderabad', avgFirstInningsScore: 182, avgSecondInningsScore: 174, battingFriendliness: 85, paceAssistance: 47, spinAssistance: 46, chasingAdvantage: 63, pitchType: 'Batting-friendly', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Low' },
  { id: 'ekana', name: 'BRSABV Ekana Stadium', city: 'Lucknow', avgFirstInningsScore: 160, avgSecondInningsScore: 150, battingFriendliness: 55, paceAssistance: 48, spinAssistance: 66, chasingAdvantage: 42, pitchType: 'Bowling-friendly', surface: 'Slow', paceBounce: 'Low', spinTurn: 'High' },
  { id: 'narendra-modi', name: 'Narendra Modi Stadium', city: 'Ahmedabad', avgFirstInningsScore: 172, avgSecondInningsScore: 163, battingFriendliness: 72, paceAssistance: 54, spinAssistance: 52, chasingAdvantage: 54, pitchType: 'Balanced', surface: 'Good', paceBounce: 'Medium', spinTurn: 'Medium' },
];

export const getVenueById = (id: string): Venue | undefined => venues.find((v) => v.id === id);
