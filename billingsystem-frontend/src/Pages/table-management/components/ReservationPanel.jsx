import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReservationPanel = ({ onCreateReservation, availableTables }) => {
  const [reservationData, setReservationData] = useState({
    customerName: '',
    phoneNumber: '',
    partySize: '',
    tableNumber: '',
    date: '',
    time: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});

  const partySizeOptions = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 People' },
    { value: '3', label: '3 People' },
    { value: '4', label: '4 People' },
    { value: '5', label: '5 People' },
    { value: '6', label: '6 People' },
    { value: '7', label: '7 People' },
    { value: '8', label: '8+ People' }
  ];

  const tableOptions = availableTables?.map(table => ({
    value: table?.number?.toString(),
    label: `Table ${table?.number} (${table?.capacity} seats)`,
    disabled: table?.status !== 'available'
  }));

  const handleInputChange = (field, value) => {
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!reservationData?.customerName?.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!reservationData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!reservationData?.partySize) {
      newErrors.partySize = 'Party size is required';
    }
    if (!reservationData?.tableNumber) {
      newErrors.tableNumber = 'Table selection is required';
    }
    if (!reservationData?.date) {
      newErrors.date = 'Date is required';
    }
    if (!reservationData?.time) {
      newErrors.time = 'Time is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    onCreateReservation(reservationData);
    setReservationData({
      customerName: '',
      phoneNumber: '',
      partySize: '',
      tableNumber: '',
      date: '',
      time: '',
      specialRequests: ''
    });
  };

  return (
    <div className="bg-card rounded-md shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center">
          <Icon name="CalendarPlus" size={24} color="var(--color-accent)" />
        </div>
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-card-foreground">
          New Reservation
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Customer Name"
          type="text"
          placeholder="Enter customer name"
          value={reservationData?.customerName}
          onChange={(e) => handleInputChange('customerName', e?.target?.value)}
          error={errors?.customerName}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          value={reservationData?.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
          error={errors?.phoneNumber}
          required
        />

        <Select
          label="Party Size"
          placeholder="Select party size"
          options={partySizeOptions}
          value={reservationData?.partySize}
          onChange={(value) => handleInputChange('partySize', value)}
          error={errors?.partySize}
          required
        />

        <Select
          label="Table Number"
          placeholder="Select table"
          options={tableOptions}
          value={reservationData?.tableNumber}
          onChange={(value) => handleInputChange('tableNumber', value)}
          error={errors?.tableNumber}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={reservationData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
          />

          <Input
            label="Time"
            type="time"
            value={reservationData?.time}
            onChange={(e) => handleInputChange('time', e?.target?.value)}
            error={errors?.time}
            required
          />
        </div>

        <Input
          label="Special Requests"
          type="text"
          placeholder="Any special requirements (optional)"
          value={reservationData?.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
        />

        <Button
          type="submit"
          variant="default"
          iconName="CheckCircle2"
          iconPosition="left"
          fullWidth
        >
          Create Reservation
        </Button>
      </form>
    </div>
  );
};

export default ReservationPanel;