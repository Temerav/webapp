package com.imre.webapp.controller;

import com.imre.webapp.model.Order;
import com.imre.webapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("")
    public void addOrder (
        @RequestBody final Order newOrder
    ) throws Exception {
        orderService.saveOrder(newOrder);
    }

}
