import { Product } from '../models/product.model.js';

export const getCartProducts = async (req, res) => {
  try {
    // Get unique product IDs from cart items
    const uniqueProductIds = [...new Set(req.user.cartItems.map(item => item._id))];

    // Get all unique products
    const products = await Product.find({ _id: { $in: uniqueProductIds } });

    // Create cart items with duplicates
    const cartItems = req.user.cartItems.map(cartItem => {
      const product = products.find(p => p._id.toString() === cartItem._id.toString());
      return {
        product: product.toJSON(),
        quantity: cartItem.quantity,
        variant: cartItem.variant,
        excludeNuts: cartItem.excludeNuts,
      }
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productId, variant, quantity, excludeNuts } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) =>
      item._id.toString() === productId.toString()
      && item.variant.size === variant.size
      && item.variant.price === variant.price
      && item.excludeNuts === excludeNuts
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > 9) {
        return res.status(400).json({ message: 'Please clear your cart before adding more items' });
      }
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({
        _id: productId,
        quantity: quantity,
        variant: variant,
        excludeNuts: excludeNuts,
      });
    }

    await user.save();

    // Find the updated or newly added item
    const product = await Product.findById(productId);

    const cartItems = {
      ...product.toJSON(),
      quantity: quantity,
      variant: variant,
      excludeNuts: excludeNuts,
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId, variant, excludeNuts } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => !(item.id === productId
          && item.variant.size === variant.size
          && item.excludeNuts === excludeNuts)
      );
    }

    await user.save();
    res.status(200).json(user.cartItems);

  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity, variant, excludeNuts } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(item => item.id === productId
      && item.variant.size === variant.size
      && item.excludeNuts === excludeNuts);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId
          && item.variant.size === variant.size
          && item.excludeNuts === excludeNuts);
        await user.save();
        return res.status(200).json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json(user.cartItems);
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const deleteAllCart = async (req, res) => {
  try {
    const user = req.user;
    user.cartItems = [];
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in deleteAllCart controller", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


