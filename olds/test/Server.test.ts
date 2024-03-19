// import { describe, it, expect, jest } from '@jest/globals'
// import { Server, IServerOptions } from '../Server';
// import { INodeStore } from '../store/INodeStore';
// import { ITaskQueue } from '../queue/ITaskQueue';

// describe('Server', () => {
//   let server: Server;
//   let options: IServerOptions;
//   let store: INodeStore;
//   let queue: ITaskQueue;

//   beforeEach(() => {
//     store = {} as INodeStore;
//     queue = {} as ITaskQueue;
//     options = {
//       port: 3000,
//       store,
//       queue,
//     };
//     server = new Server(options);
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   describe('getPort', () => {
//     it('should return the port number', () => {
//       expect(server.getPort()).toBe(3000);
//     });
//   });

//   describe('start', () => {
//     it('should start the server', async () => {
//       // Mock express app and listen method
//       const app = {
//         listen: jest.fn((port, callback) => {
//           callback();
//         }),
//       };
//       jest.spyOn(express, 'default').mockReturnValue(app as any);

//       await server.start();

//       expect(express.default).toHaveBeenCalled();
//       expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
//     });
//   });

//   describe('listNode', () => {
//     it('should handle the listNode request', async () => {
//       // Mock express request and response objects
//       const req = {} as any;
//       const res = {
//         send: jest.fn(),
//       } as any;

//       await server['listNode'](req, res);

//       expect(res.send).toHaveBeenCalled();
//     });
//   });

//   describe('getNodeByURL', () => {
//     it('should handle the getNodeByURL request', async () => {
//       // Mock express request and response objects
//       const req = {} as any;
//       const res = {
//         send: jest.fn(),
//       } as any;

//       await server['getNodeByURL'](req, res);

//       expect(res.send).toHaveBeenCalled();
//     });
//   });

//   describe('countNodes', () => {
//     it('should handle the countNodes request', async () => {
//       // Mock express request and response objects
//       const req = {} as any;
//       const res = {
//         send: jest.fn(),
//       } as any;

//       await server['countNodes'](req, res);

//       expect(res.send).toHaveBeenCalled();
//     });
//   });

//   describe('getQueueStatus', () => {
//     it('should handle the getQueueStatus request', async () => {
//       // Mock express request and response objects
//       const req = {} as any;
//       const res = {
//         send: jest.fn(),
//       } as any;

//       await server['getQueueStatus'](req, res);

//       expect(res.send).toHaveBeenCalled();
//     });
//   });
// });
