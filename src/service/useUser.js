import testApi from "@/http/testApi.js";
import axios from 'axios';
export default () => {
    let dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'])

    async function getDog() {
        try {
            let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random');
            dogList.push(result.data.message)
        } catch (error) {
            alert(error);
        }
    }

    function getA1() {
        testApi.getMock().then(res => {
            console.log("getA1", res);
            alert("getA1", res)
        });
    }
    onMounted(() => {
        console.log("getDog GZ")
        getDog();
    })
    return {
        dogList,
        getDog,
        getA1
    }

}