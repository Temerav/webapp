package com.imre.webapp.service;

import com.imre.webapp.model.Order;
import com.imre.webapp.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public void saveOrder (Order order) throws Exception {
        var orderSave = new Order();
        try {
            orderSave.setName(order.getName());
            orderSave.setEmail(order.getEmail());
            orderSave.setAddress(order.getAddress());
            orderSave.setPhone(order.getPhone());
            orderSave.setComment(order.getComment());
            orderSave.setCartItems(order.getCartItems());
            orderRepository.save(orderSave);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Failed to save order", e);
        }
    }

}
