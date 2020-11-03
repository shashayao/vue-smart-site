import axios from 'axios'


// 测试的接口地址http://123.207.32.32:8000/home/multidata
export function request(config) {
  const instance = new axios.create({
    // baseURL:'http://www.pm25.in',
    // timeout:5000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    //拦截后需要将拦截下来的请求数据返回发送
    // console.log(config);
    return config;
  }, err => {
    // console.log(err)
  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
