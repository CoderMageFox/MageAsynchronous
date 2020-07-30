const promisify = func => (...args) =>
    new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    );

// ex :const delay = promisify((d, cb) => setTimeout(cb, d));
// delay(2000)
// 	.then(() => console.log('Hello World!'));

//使用 Web Worker 来在独立线程调用函数，避免阻塞 UI 交互。

const runAsync = fn => {
    const worker = new Worker(
        URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
            type: 'application/javascript; charset=utf-8'
        })
    );
    return new Promise((res, rej) => {
        worker.onmessage = ({data}) => {
            res(data), worker.terminate();
        };
        worker.onerror = err => {
            rej(err), worker.terminate();
        };
    });
};

const tools = {
    promisify,
    runAsync
}
export default tools
