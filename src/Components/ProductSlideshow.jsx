import { useState, useEffect } from 'react';
import { Box, Image, Text, IconButton, Flex, Spinner } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
const Slideshow = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products/page'); // Make sure to use the full URL if different port
      const data = await response.json();
      // console.log(data); // Check the data in console to verify the response
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

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
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

  return (
    <Box position="relative" width="80%" margin="auto" overflow="hidden">
      {/* Current Slide */}
      <Box textAlign="center">
         <Link to={`/products/${products[currentIndex]?._id}`}>
        <Image
          src={products[currentIndex]?.photo}
          alt={products[currentIndex]?.name}
          boxSize="400px"
          objectFit="cover"
          margin="auto"
        />
        </Link>
        <Text fontSize="xl" fontWeight="bold">
          {products[currentIndex]?.name}
        </Text>
        <Text>Price: ₹{products[currentIndex]?.price}</Text>
      </Box>

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
