import { Component } from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      role: 'Officer',
      photo: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      role: 'Manager',
      photo: 'https://via.placeholder.com/40',
    },
    // Add more users as needed
  ];

  selectedUser: any = null;

  // Add a new user
  addUser() {
    this.selectedUser = {
      id: null,
      name: '',
      email: '',
      phone: '',
      role: '',
      photo: 'https://via.placeholder.com/40', // Default photo
    };
  }

  // Edit a user
  editUser(user: any) {
    this.selectedUser = { ...user }; // Create a copy of the user object
  }

  // Save the user (add or update)
  saveUser() {
    if (this.selectedUser.id) {
      // Update existing user
      const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
      }
    } else {
      // Add new user
      const newId = Math.max(...this.users.map((u) => u.id)) + 1;
      this.selectedUser.id = newId;
      this.users.push({ ...this.selectedUser });
    }
    this.selectedUser = null; // Reset form
  }

  // Delete a user
  deleteUser(user: any) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  // Cancel editing
  cancelEdit() {
    this.selectedUser = null; // Reset form
  }
}

