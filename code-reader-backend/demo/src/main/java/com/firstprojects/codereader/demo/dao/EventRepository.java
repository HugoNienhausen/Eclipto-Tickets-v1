package com.firstprojects.codereader.demo.dao;

import com.firstprojects.codereader.demo.entities.Event;
import com.firstprojects.codereader.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(User user);
    List<Event> findAll();
}
