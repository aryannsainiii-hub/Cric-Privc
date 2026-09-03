import { Team } from '../types/team';

export const teams: Team[] = [
  { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', primaryColor: '#3EA6FF', secondaryColor: '#0D1224', logoInitials: 'MI', homeVenueId: 'wankhede', form: [1, 1, 0, 1, 1] },
  { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', primaryColor: '#C9A24B', secondaryColor: '#0D1224', logoInitials: 'CSK', homeVenueId: 'chepauk', form: [1, 0, 1, 0, 1] },
  { id: 'rcb', name: 'Royal Challengers Bengaluru', shortName: 'RCB', primaryColor: '#E2604F', secondaryColor: '#0D1224', logoInitials: 'RCB', homeVenueId: 'chinnaswamy', form: [0, 1, 1, 1, 0] },
  { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', primaryColor: '#6B4EFF', secondaryColor: '#0D1224', logoInitials: 'KKR', homeVenueId: 'eden', form: [1, 1, 1, 0, 1] },
  { id: 'rr', name: 'Rajasthan Royals', shortName: 'RR', primaryColor: '#FF6FAE', secondaryColor: '#0D1224', logoInitials: 'RR', homeVenueId: 'sawaimansingh', form: [1, 0, 1, 1, 0] },
  { id: 'dc', name: 'Delhi Capitals', shortName: 'DC', primaryColor: '#3EA6FF', secondaryColor: '#0D1224', logoInitials: 'DC', homeVenueId: 'arun-jaitley', form: [0, 0, 1, 1, 0] },
  { id: 'pbks', name: 'Punjab Kings', shortName: 'PBKS', primaryColor: '#E2604F', secondaryColor: '#0D1224', logoInitials: 'PBKS', homeVenueId: 'mullanpur', form: [1, 0, 0, 1, 1] },
  { id: 'srh', name: 'Sunrisers Hyderabad', shortName: 'SRH', primaryColor: '#E4890A', secondaryColor: '#0D1224', logoInitials: 'SRH', homeVenueId: 'uppal', form: [1, 1, 0, 0, 1] },
  { id: 'lsg', name: 'Lucknow Super Giants', shortName: 'LSG', primaryColor: '#34C77B', secondaryColor: '#0D1224', logoInitials: 'LSG', homeVenueId: 'ekana', form: [0, 1, 1, 0, 1] },
  { id: 'gt', name: 'Gujarat Titans', shortName: 'GT', primaryColor: '#6B4EFF', secondaryColor: '#0D1224', logoInitials: 'GT', homeVenueId: 'narendra-modi', form: [1, 1, 0, 1, 0] },
];

export const getTeamById = (id: string): Team | undefined => teams.find((t) => t.id === id);
