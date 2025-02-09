import { useState, useEffect } from 'react';
import { Box, Image, Text, IconButton, Flex, Spinner } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

const Slideshow = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerSlide = 3;  // Show 3 items at a time

  // Fetch data from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/page`); // Ensure the URL is correct
      const data = await response.json();
      setProducts(data); // Set the products state with fetched data
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products once on mount

  // Auto slide every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, [currentIndex]);

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.floor(products.length / itemsPerSlide) : prevIndex - 1
    );
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.floor(products.length / itemsPerSlide) ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (products.length === 0) {
    return <Text>No products available</Text>;
  }

  // Get the current window of products to display
  const currentProducts = products.slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide);

  return (
    <Box position="relative" width="80%" margin="auto" overflow="hidden" marginTop={'80px'} marginBottom={'50px'}>
      {/* Current Slide (3 items) */}
      <Flex justify="center" align="center" gap="20px">
        {currentProducts.map((product) => (
          <Box key={product._id} textAlign="center" width="450px">
            <Link to={`/products/${product._id}`}>
              <Image
                src={product.photo}
                alt={product.name}
                boxSize="400px"
                objectFit="contain"  // Adjusting image fit to avoid cropping
                margin="auto"
              />
            </Link>
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Text>Price: ₹{product.price}</Text>
          </Box>
        ))}
      </Flex>

      {/* Navigation Arrows */}
      <IconButton
        icon={<ArrowLeftIcon />}
        position="absolute"
        top="50%"
        left="0"
        transform="translateY(-50%)"
        onClick={prevSlide}
        aria-label="Previous Slide"
      />
      <IconButton
        icon={<ArrowRightIcon />}
        position="absolute"
        top="50%"
        right="0"
        transform="translateY(-50%)"
        onClick={nextSlide}
        aria-label="Next Slide"
      />
    </Box>
  );
};

export default Slideshow;
