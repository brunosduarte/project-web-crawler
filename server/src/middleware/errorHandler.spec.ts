import { errorHandler } from '@/middleware/errorHandler';
import { FastifyError } from 'fastify';

vi.mock('fastify');

describe('errorHandler', () => {
  let mockRequest: any;
  let mockReply: any;
  let mockError: FastifyError;

  beforeEach(() => {
    mockRequest = {
      id: 'testId',
    };
    mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    mockError = new Error('Test error') as FastifyError;
  });

  it('should be a function', () => {
    expect(typeof errorHandler).toBe('function');
  });

  it('should log an error message with the request id and error', () => {
    console.error = vi.fn();
    errorHandler(mockError, mockRequest, mockReply);
    expect(console.error).toHaveBeenCalledWith(`Error processing request ${mockRequest.id}: `, mockError);
  });

  it('should send a response with status 500 and a message "Internal Server Error"', () => {
    errorHandler(mockError, mockRequest, mockReply);
    expect(mockReply.status).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});