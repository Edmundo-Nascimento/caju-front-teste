jest.mock('~/store/registration', () => ({
  useRegistrationStore: jest.fn(() => ({
    updateRegistration: jest.fn(),
    deleteRegistration: jest.fn(),
    fetchRegistration: jest.fn(),
  })),
}));
