import { useRecurrenceStore } from '../recurrenceStore';

describe('RecurrenceStore', () => {
  beforeEach(() => {
    // Reset the store to initial state
    useRecurrenceStore.setState({
      startDate: null,
      endDate: null,
      recurrenceType: 'daily',
      interval: 1,
      daysOfWeek: [],
      pattern: null,
      previewDates: [],
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useRecurrenceStore.getState();
      
      expect(state.startDate).toBeNull();
      expect(state.endDate).toBeNull();
      expect(state.recurrenceType).toBe('daily');
      expect(state.interval).toBe(1);
      expect(state.daysOfWeek).toEqual([]);
      expect(state.pattern).toBeNull();
      expect(state.previewDates).toEqual([]);
    });
  });

  describe('State Updates', () => {
    it('should update start date', () => {
      const testDate = new Date('2024-01-15');
      useRecurrenceStore.getState().setStartDate(testDate);
      
      expect(useRecurrenceStore.getState().startDate).toEqual(testDate);
    });

    it('should update end date', () => {
      const testDate = new Date('2024-12-31');
      useRecurrenceStore.getState().setEndDate(testDate);
      
      expect(useRecurrenceStore.getState().endDate).toEqual(testDate);
    });

    it('should update recurrence type', () => {
      useRecurrenceStore.getState().setRecurrenceType('weekly');
      
      expect(useRecurrenceStore.getState().recurrenceType).toBe('weekly');
    });

    it('should update interval', () => {
      useRecurrenceStore.getState().setInterval(3);
      
      expect(useRecurrenceStore.getState().interval).toBe(3);
    });

    it('should update days of week', () => {
      useRecurrenceStore.getState().setDaysOfWeek([1, 3, 5]);
      
      expect(useRecurrenceStore.getState().daysOfWeek).toEqual([1, 3, 5]);
    });

    it('should update pattern', () => {
      const pattern = { week: 2, day: 1 };
      useRecurrenceStore.getState().setPattern(pattern);
      
      expect(useRecurrenceStore.getState().pattern).toEqual(pattern);
    });
  });

  describe('Date Generation - Daily', () => {
    it('should generate daily dates with interval 1', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'daily',
        interval: 1,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(6);
      expect(previewDates[0]).toEqual(new Date('2024-01-15'));
      expect(previewDates[1]).toEqual(new Date('2024-01-16'));
      expect(previewDates[2]).toEqual(new Date('2024-01-17'));
      expect(previewDates[3]).toEqual(new Date('2024-01-18'));
      expect(previewDates[4]).toEqual(new Date('2024-01-19'));
      expect(previewDates[5]).toEqual(new Date('2024-01-20'));
    });

    it('should generate daily dates with interval 2', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-25');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'daily',
        interval: 2,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(6);
      expect(previewDates[0]).toEqual(new Date('2024-01-15'));
      expect(previewDates[1]).toEqual(new Date('2024-01-17'));
      expect(previewDates[2]).toEqual(new Date('2024-01-19'));
      expect(previewDates[3]).toEqual(new Date('2024-01-21'));
      expect(previewDates[4]).toEqual(new Date('2024-01-23'));
      expect(previewDates[5]).toEqual(new Date('2024-01-25'));
    });
  });

  describe('Date Generation - Weekly', () => {
    it('should generate weekly dates with same day of week', () => {
      const startDate = new Date('2024-01-15'); // Monday
      const endDate = new Date('2024-02-12'); // Monday, 4 weeks later
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'weekly',
        interval: 1,
        daysOfWeek: [],
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(5);
      expect(previewDates[0]).toEqual(new Date('2024-01-15')); // Monday
      expect(previewDates[1]).toEqual(new Date('2024-01-22')); // Monday
      expect(previewDates[2]).toEqual(new Date('2024-01-29')); // Monday
      expect(previewDates[3]).toEqual(new Date('2024-02-05')); // Monday
      expect(previewDates[4]).toEqual(new Date('2024-02-12')); // Monday
    });

    it('should generate weekly dates with specific days', () => {
      const startDate = new Date('2024-01-15'); // Monday
      const endDate = new Date('2024-01-28'); // Sunday, 2 weeks later
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'weekly',
        interval: 1,
        daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(6);
      expect(previewDates[0]).toEqual(new Date('2024-01-15')); // Monday
      expect(previewDates[1]).toEqual(new Date('2024-01-17')); // Wednesday
      expect(previewDates[2]).toEqual(new Date('2024-01-19')); // Friday
      expect(previewDates[3]).toEqual(new Date('2024-01-22')); // Monday
      expect(previewDates[4]).toEqual(new Date('2024-01-24')); // Wednesday
      expect(previewDates[5]).toEqual(new Date('2024-01-26')); // Friday
    });
  });

  describe('Date Generation - Monthly', () => {
    it('should generate monthly dates with same day of month', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-04-15');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'monthly',
        interval: 1,
        pattern: null,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(4);
      expect(previewDates[0]).toEqual(new Date('2024-01-15'));
      expect(previewDates[1]).toEqual(new Date('2024-02-15'));
      expect(previewDates[2]).toEqual(new Date('2024-03-15'));
      expect(previewDates[3]).toEqual(new Date('2024-04-15'));
    });

    it('should generate monthly dates with pattern (2nd Tuesday)', () => {
      const startDate = new Date('2024-01-09'); // 2nd Tuesday of January
      const endDate = new Date('2024-04-09'); // 2nd Tuesday of April
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'monthly',
        interval: 1,
        pattern: { week: 2, day: 2 }, // 2nd Tuesday (Tuesday = 2)
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(4);
      // 2nd Tuesday of each month
      expect(previewDates[0]).toEqual(new Date('2024-01-09')); // 2nd Tuesday of January
      expect(previewDates[1]).toEqual(new Date('2024-02-13')); // 2nd Tuesday of February
      expect(previewDates[2]).toEqual(new Date('2024-03-12')); // 2nd Tuesday of March
      expect(previewDates[3]).toEqual(new Date('2024-04-09')); // 2nd Tuesday of April
    });
  });

  describe('Date Generation - Yearly', () => {
    it('should generate yearly dates', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2027-01-15');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'yearly',
        interval: 1,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(4);
      expect(previewDates[0]).toEqual(new Date('2024-01-15'));
      expect(previewDates[1]).toEqual(new Date('2025-01-15'));
      expect(previewDates[2]).toEqual(new Date('2026-01-15'));
      expect(previewDates[3]).toEqual(new Date('2027-01-15'));
    });

    it('should generate yearly dates with interval 2', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2030-01-15');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'yearly',
        interval: 2,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(4);
      expect(previewDates[0]).toEqual(new Date('2024-01-15'));
      expect(previewDates[1]).toEqual(new Date('2026-01-15'));
      expect(previewDates[2]).toEqual(new Date('2028-01-15'));
      expect(previewDates[3]).toEqual(new Date('2030-01-15'));
    });
  });

  describe('Edge Cases', () => {
    it('should handle no start date', () => {
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toEqual([]);
    });

    it('should use default end date (1 year from start) when no end date provided', () => {
      const startDate = new Date('2024-01-15');
      
      useRecurrenceStore.setState({
        startDate,
        endDate: null,
        recurrenceType: 'daily',
        interval: 1,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates.length).toBeGreaterThan(300); // Should have ~365 days
      expect(previewDates[0]).toEqual(startDate);
      expect(previewDates[previewDates.length - 1].getFullYear()).toBe(2025);
    });

    it('should handle invalid interval gracefully', () => {
      const startDate = new Date('2024-01-15');
      
      useRecurrenceStore.setState({
        startDate,
        recurrenceType: 'daily',
        interval: 0, // Invalid interval
      });
      
      // Should not throw error
      expect(() => {
        useRecurrenceStore.getState().generatePreview();
      }).not.toThrow();
    });
  });

  describe('Date Validation', () => {
    it('should not generate dates beyond end date', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'daily',
        interval: 1,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      const lastDate = previewDates[previewDates.length - 1];
      expect(lastDate).toBeLessThanOrEqual(endDate);
    });

    it('should handle leap year correctly', () => {
      const startDate = new Date('2024-02-29'); // Leap year
      const endDate = new Date('2028-02-29'); // Next leap year
      
      useRecurrenceStore.setState({
        startDate,
        endDate,
        recurrenceType: 'yearly',
        interval: 1,
      });
      
      useRecurrenceStore.getState().generatePreview();
      
      const previewDates = useRecurrenceStore.getState().previewDates;
      expect(previewDates).toHaveLength(2);
      expect(previewDates[0]).toEqual(new Date('2024-02-29'));
      expect(previewDates[1]).toEqual(new Date('2028-02-29'));
    });
  });
}); 