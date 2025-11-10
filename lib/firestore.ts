import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  QueryConstraint 
} from "firebase/firestore";
import { db } from "./firebase";
import { Film, CreativeDirection, Photography, Event, Blog, ContactMessage } from "@/types";

// Helper to convert Firestore timestamp to Date
const convertTimestamp = (timestamp: any): Date | undefined => {
  if (!timestamp) return undefined;
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// ==================== FILMS ====================
export const filmsCollection = collection(db, "films");

export const getFilms = async (category?: string): Promise<Film[]> => {
  try {
    // Always fetch all films first to avoid index issues
    const q = query(filmsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    let films = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Film[];
    
    // Filter by category on client-side if specified
    if (category && category !== "All") {
      films = films.filter(film => film.category === category);
    }
    
    return films;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
};

export const getFilm = async (id: string): Promise<Film | null> => {
  try {
    const docRef = doc(db, "films", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: convertTimestamp(docSnap.data().createdAt),
        updatedAt: convertTimestamp(docSnap.data().updatedAt),
      } as Film;
    }
    return null;
  } catch (error) {
    console.error("Error fetching film:", error);
    return null;
  }
};

export const addFilm = async (film: Omit<Film, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(filmsCollection, {
      ...film,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding film:", error);
    throw error;
  }
};

export const updateFilm = async (id: string, film: Partial<Film>): Promise<void> => {
  try {
    const docRef = doc(db, "films", id);
    await updateDoc(docRef, {
      ...film,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating film:", error);
    throw error;
  }
};

export const deleteFilm = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "films", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting film:", error);
    throw error;
  }
};

// ==================== CREATIVE DIRECTION ====================
export const creativeCollection = collection(db, "creative");

export const getCreativeDirections = async (): Promise<CreativeDirection[]> => {
  try {
    const q = query(creativeCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as CreativeDirection[];
  } catch (error) {
    console.error("Error fetching creative directions:", error);
    return [];
  }
};

export const getCreativeDirection = async (id: string): Promise<CreativeDirection | null> => {
  try {
    const docRef = doc(db, "creative", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: convertTimestamp(docSnap.data().createdAt),
        updatedAt: convertTimestamp(docSnap.data().updatedAt),
      } as CreativeDirection;
    }
    return null;
  } catch (error) {
    console.error("Error fetching creative direction:", error);
    return null;
  }
};

export const addCreativeDirection = async (creative: Omit<CreativeDirection, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(creativeCollection, {
      ...creative,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding creative direction:", error);
    throw error;
  }
};

export const updateCreativeDirection = async (id: string, creative: Partial<CreativeDirection>): Promise<void> => {
  try {
    const docRef = doc(db, "creative", id);
    await updateDoc(docRef, {
      ...creative,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating creative direction:", error);
    throw error;
  }
};

export const deleteCreativeDirection = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "creative", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting creative direction:", error);
    throw error;
  }
};

// ==================== PHOTOGRAPHY ====================
export const photographyCollection = collection(db, "photography");

export const getPhotographies = async (category?: string): Promise<Photography[]> => {
  try {
    // Always fetch all photos first to avoid index issues
    const q = query(photographyCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    let photos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Photography[];
    
    // Filter by category on client-side if specified
    if (category && category !== "All") {
      photos = photos.filter(photo => photo.category === category);
    }
    
    return photos;
  } catch (error) {
    console.error("Error fetching photographs:", error);
    return [];
  }
};

export const getPhotography = async (id: string): Promise<Photography | null> => {
  try {
    const docRef = doc(db, "photography", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: convertTimestamp(docSnap.data().createdAt),
        updatedAt: convertTimestamp(docSnap.data().updatedAt),
      } as Photography;
    }
    return null;
  } catch (error) {
    console.error("Error fetching photography:", error);
    return null;
  }
};

export const addPhotography = async (photography: Omit<Photography, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(photographyCollection, {
      ...photography,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding photography:", error);
    throw error;
  }
};

export const updatePhotography = async (id: string, photography: Partial<Photography>): Promise<void> => {
  try {
    const docRef = doc(db, "photography", id);
    await updateDoc(docRef, {
      ...photography,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating photography:", error);
    throw error;
  }
};

export const deletePhotography = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "photography", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting photography:", error);
    throw error;
  }
};

// ==================== EVENTS ====================
export const eventsCollection = collection(db, "events");

export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(eventsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Event[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getEvent = async (id: string): Promise<Event | null> => {
  try {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: convertTimestamp(docSnap.data().createdAt),
        updatedAt: convertTimestamp(docSnap.data().updatedAt),
      } as Event;
    }
    return null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

export const addEvent = async (event: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...event,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<void> => {
  try {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, {
      ...event,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "events", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// ==================== BLOGS ====================
export const blogsCollection = collection(db, "blogs");

export const getBlogs = async (publishedOnly: boolean = false): Promise<Blog[]> => {
  try {
    let q = query(blogsCollection, orderBy("createdAt", "desc"));
    
    if (publishedOnly) {
      q = query(blogsCollection, where("published", "==", true), orderBy("publishedAt", "desc"));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      publishedAt: convertTimestamp(doc.data().publishedAt),
      createdAt: convertTimestamp(doc.data().createdAt),
      updatedAt: convertTimestamp(doc.data().updatedAt),
    })) as Blog[];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlog = async (id: string): Promise<Blog | null> => {
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        publishedAt: convertTimestamp(docSnap.data().publishedAt),
        createdAt: convertTimestamp(docSnap.data().createdAt),
        updatedAt: convertTimestamp(docSnap.data().updatedAt),
      } as Blog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const q = query(blogsCollection, where("slug", "==", slug), where("published", "==", true));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        publishedAt: convertTimestamp(doc.data().publishedAt),
        createdAt: convertTimestamp(doc.data().createdAt),
        updatedAt: convertTimestamp(doc.data().updatedAt),
      } as Blog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};

export const addBlog = async (blog: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const dataToAdd: any = {
      ...blog,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    // If publishing, set publishedAt to now
    if (blog.published) {
      dataToAdd.publishedAt = Timestamp.now();
    }
    
    const docRef = await addDoc(blogsCollection, dataToAdd);
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

export const updateBlog = async (id: string, blog: Partial<Blog>): Promise<void> => {
  try {
    // Get current blog to check if it was previously published
    const currentBlog = await getBlog(id);
    const dataToUpdate: any = {
      ...blog,
      updatedAt: Timestamp.now(),
    };
    
    // If publishing for the first time (wasn't published before), set publishedAt
    if (blog.published && !currentBlog?.publishedAt) {
      dataToUpdate.publishedAt = Timestamp.now();
    }
    
    const docRef = doc(db, "blogs", id);
    await updateDoc(docRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// ==================== CONTACT MESSAGES ====================
export const contactMessagesCollection = collection(db, "contactMessages");

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const q = query(contactMessagesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestamp(doc.data().createdAt),
    })) as ContactMessage[];
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
};

export const getContactMessage = async (id: string): Promise<ContactMessage | null> => {
  try {
    const docRef = doc(db, "contactMessages", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: convertTimestamp(docSnap.data().createdAt),
      } as ContactMessage;
    }
    return null;
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return null;
  }
};

export const addContactMessage = async (message: Omit<ContactMessage, "id" | "createdAt" | "read">): Promise<string> => {
  try {
    const docRef = await addDoc(contactMessagesCollection, {
      ...message,
      read: false,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw error;
  }
};

export const markContactMessageAsRead = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "contactMessages", id);
    await updateDoc(docRef, {
      read: true,
    });
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "contactMessages", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
};

// ==================== ANALYTICS ====================
export const getAnalytics = async () => {
  try {
    const [films, creative, photography, events, blogs, messages] = await Promise.all([
      getDocs(filmsCollection),
      getDocs(creativeCollection),
      getDocs(photographyCollection),
      getDocs(eventsCollection),
      getDocs(query(blogsCollection, where("published", "==", true))),
      getDocs(contactMessagesCollection),
    ]);

    const unreadMessages = messages.docs.filter(doc => !doc.data().read).length;
    
    return {
      films: films.size,
      creative: creative.size,
      photography: photography.size,
      events: events.size,
      blogs: blogs.size,
      totalMessages: messages.size,
      unreadMessages,
      totalContent: films.size + creative.size + photography.size + events.size + blogs.size,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      films: 0,
      creative: 0,
      photography: 0,
      events: 0,
      blogs: 0,
      totalMessages: 0,
      unreadMessages: 0,
      totalContent: 0,
    };
  }
};

