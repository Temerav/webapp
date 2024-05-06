package com.imre.webapp.repository;

import com.imre.webapp.model.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkItemRepository extends JpaRepository<WorkItem, Long> {
    Optional<WorkItem> findWorkItemById(Long id);
}
