import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { studentsAPI } from '../../services/api';

interface StudentFormData {
  name: string;
  email: string;
  age: string;
  grade: string;
  phone: string;
  address: string;
}

const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    age: '',
    grade: '',
    phone: '',
    address: ''
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      setFetching(true);
      const response = await studentsAPI.getById(id!);
      const student = response.data.student;
      setFormData({
        name: student.name || '',
        email: student.email || '',
        age: student.age?.toString() || '',
        grade: student.grade || '',
        phone: student.phone || '',
        address: student.address || ''
      });
    } catch (error) {
      console.error('Error fetching student:', error);
      setError('Failed to fetch student data');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (field: keyof StudentFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleGradeChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      grade: event.target.value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.age.trim()) {
      setError('Age is required');
      return false;
    }
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 5 || age > 25) {
      setError('Age must be between 5 and 25');
      return false;
    }
    if (!formData.grade.trim()) {
      setError('Grade is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const studentData = {
        ...formData,
        age: parseInt(formData.age)
      };

      if (isEditMode) {
        await studentsAPI.update(id!, studentData);
      } else {
        await studentsAPI.create(studentData);
      }

      navigate('/students');
    } catch (error: any) {
      console.error('Error saving student:', error);
      setError(error.response?.data?.message || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditMode ? 'Edit Student' : 'Add New Student'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleInputChange('age')}
              inputProps={{ min: 5, max: 25 }}
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Grade</InputLabel>
              <Select
                value={formData.grade}
                label="Grade"
                onChange={handleGradeChange}
              >
                <MenuItem value="Kindergarten">Kindergarten</MenuItem>
                <MenuItem value="1st Grade">1st Grade</MenuItem>
                <MenuItem value="2nd Grade">2nd Grade</MenuItem>
                <MenuItem value="3rd Grade">3rd Grade</MenuItem>
                <MenuItem value="4th Grade">4th Grade</MenuItem>
                <MenuItem value="5th Grade">5th Grade</MenuItem>
                <MenuItem value="6th Grade">6th Grade</MenuItem>
                <MenuItem value="7th Grade">7th Grade</MenuItem>
                <MenuItem value="8th Grade">8th Grade</MenuItem>
                <MenuItem value="9th Grade">9th Grade</MenuItem>
                <MenuItem value="10th Grade">10th Grade</MenuItem>
                <MenuItem value="11th Grade">11th Grade</MenuItem>
                <MenuItem value="12th Grade">12th Grade</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
            />
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleInputChange('address')}
              required
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ mr: 1 }} />
              ) : null}
              {isEditMode ? 'Update Student' : 'Add Student'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/students')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentForm; 