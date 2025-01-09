import { useEffect, useState } from 'react';
import { Node } from './vertex/node';
const sharedWorker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
  name: 'managerWorker',
});

const App = () => {
  const [worker, setWorker] = useState<Node | null>(null);

  useEffect(() => {
    const boot = async () => {
      const worker = await Node.create(sharedWorker);
      worker.onElection(async (server: any) => {
        // const db = await connectDB();
        // createServices(server, db);
        server.addService('return1', () => {
          return 111;
          throw new Error('没有实现');
        });
      });

      // worker.createService('return1', () => {
      //   console.log('handle return1');

      //   throw new Error('没有实现');
      // });

      setWorker(worker);
    };
    boot();
  }, []);

  const sendMessage = async () => {
    console.log('send message');
    try {
      const res = await worker?.request('return1', {
        data: {
          type: 'db',
          sql: 'select * from user',
        },
      });

      console.log('res===>', res);
    } catch (error) {}
  };

  const postManager = () => {
    console.log('postManager');
    /*  worker?.post({
      data: {
        action: 'db',
        sql: 'select * from user',
      },
    }); */
  };

  const broadcast = () => {
    worker?.broadcast({
      type: '更新会话详情',
      ids: [1, 2, 3],
    });
  };

  const watchBroadcast = () => {
    worker?.onBroadcast((data) => {
      console.log('watchBroadcast', data);
    });
  };
  return (
    <div>
      <button onClick={postManager}>postManager</button>
      <button onClick={sendMessage}>await send message</button>
      <button onClick={broadcast}>广播</button>
      <button onClick={watchBroadcast}>监听广播</button>
    </div>
  );
};

export default App;
