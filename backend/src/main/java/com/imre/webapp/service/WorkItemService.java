package com.imre.webapp.service;

import com.imre.webapp.model.WorkItem;
import com.imre.webapp.repository.WorkItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class WorkItemService {

    private final WorkItemRepository workItemRepository;

    public List<WorkItem> getAllWorkItems () {
        return workItemRepository.findAll();
    }

    public WorkItem getWorkItemById (
        final Long id
    ) {
        return workItemRepository.findById(id).orElse(null);
    }

    public void deleteWorkItem (
        final Long id
    )
        throws Exception {
        try {
            workItemRepository
                .findWorkItemById(id)
                .ifPresent(workItemRepository::delete);
        } catch (Exception ex) {
            throw new Exception(STR."WorkItem with id: \{id} not exist", ex);
        }
    }

    @Transactional
    public void updateWorkItem (
        final Long id,
        final WorkItem newWorkItem
    )
        throws Exception {
        try {

            workItemRepository
                .findWorkItemById(id)
                .ifPresent(
                    workItem -> {
                        workItem.setItemName(newWorkItem.getItemName());
                        workItem.setItemDetails(newWorkItem.getItemDetails());
                        workItem.setPicturePath(newWorkItem.getPicturePath());
                    }
                );
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    @Transactional
    public void saveItem (final WorkItem newWorkItem)
        throws Exception {
        final var workItemToSave = newWorkItem;
        try {

            workItemToSave.setItemName(newWorkItem.getItemName());
            workItemToSave.setItemDetails(newWorkItem.getItemDetails());
            workItemToSave.setPicturePath(newWorkItem.getPicturePath());
            workItemRepository.save(workItemToSave);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

}
