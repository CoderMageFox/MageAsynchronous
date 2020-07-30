const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function basicPromise(excutor){
    let that = this;
    that.status  = PENDING;
    that.value = undefined;
    that.reason = undefined;
    that.onfullfilledCallback = [];
    that.onrejectedCallback = [];
    function resolve(value){
        if(value instanceof basicPromise){
            return value.then(resolve,reject)
        }
        setTimeout(() => {
            if(that.status === PENDING){
                that.status = FULFILLED;
                that.value = value;
                this.onfullfilledCallback.map((cb)=>{
                    cb&&cb(value)
                })
            }
        });
    }
    function reject(reson){
        if(value instanceof basicPromise){
            return resolve()
        }
    }
}

