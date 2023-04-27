// Ref: https://www.patterns.dev/posts/hoc-pattern/

function withLoader(Element, url) {
    return (props) => {
        const [data, setData] = useState(null);

        useEffect(() => {
            async function getData() {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            }

            getData();
        }, []);

        if (!data) {
            return <div>Loading...</div>;
        }

        return <Element {...props} data={data} />;
    };
}

function DogImages(props) {
    return props.data.message.map((dog, index) => (
        <img src={dog} alt="Dog" key={index} />
    ));
}

export default withLoader(
    DogImages,
    "https://dog.ceo/api/breed/labrador/images/random/6"
);
