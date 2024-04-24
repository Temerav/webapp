package com.imre.webapp.service;

import com.imre.webapp.model.WorkItem;
import com.imre.webapp.repository.WorkItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkItemService {

    private final WorkItemRepository workItemRepository;

    public List<WorkItem> getAllWorkItems() {
        return workItemRepository.findAll();
    }

    public WorkItem getWorkItemById(Long id) {
        return workItemRepository.findById(id).orElse(null);
    }
}
