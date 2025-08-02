import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';

import {
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, studentsAPI } from '../../services/api';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  newStudentsThisMonth: number;
  averageAge: number;
}

interface RecentStudent {
  id: string;
  name: string;
  email: string;
  grade: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    newStudentsThisMonth: 0,
    averageAge: 0
  });
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const statsResponse = await dashboardAPI.getStats();
      setStats(statsResponse.data);

      // Fetch recent students
      const studentsResponse = await studentsAPI.getAll({ limit: 5 });
      setRecentStudents(studentsResponse.data.students || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for demonstration
      setStats({
        totalStudents: 150,
        activeStudents: 142,
        newStudentsThisMonth: 12,
        averageAge: 16.5
      });
      setRecentStudents([
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@email.com',
          grade: '10th Grade',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          grade: '11th Grade',
          createdAt: '2024-01-14'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/students/new')}
            sx={{ mr: 1 }}
          >
            Add Student
          </Button>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/students')}
          >
            View All
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<PeopleIcon sx={{ color: 'white' }} />}
          color="#1976d2"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          icon={<SchoolIcon sx={{ color: 'white' }} />}
          color="#2e7d32"
        />
        <StatCard
          title="New This Month"
          value={stats.newStudentsThisMonth}
          icon={<TrendingUpIcon sx={{ color: 'white' }} />}
          color="#ed6c02"
        />
        <StatCard
          title="Average Age"
          value={stats.averageAge}
          icon={<PeopleIcon sx={{ color: 'white' }} />}
          color="#9c27b0"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Students
          </Typography>
          <List>
            {recentStudents.map((student) => (
              <ListItem key={student.id} divider>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={student.name}
                  secondary={`${student.email} • ${student.grade}`}
                />
                <Chip
                  label={new Date(student.createdAt).toLocaleDateString()}
                  size="small"
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/students/new')}
              startIcon={<AddIcon />}
            >
              Add New Student
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/students')}
              startIcon={<SearchIcon />}
            >
              Search Students
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 