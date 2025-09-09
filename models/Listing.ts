import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IListing extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: 'real-estate' | 'cars' | 'watches' | 'jewelry' | 'art' | 'yachts' | 'private-jets' | 'other';
  subcategory?: string;
  images: string[];
  videos?: string[];
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  seller: mongoose.Types.ObjectId;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'sold';
  featured: boolean;
  featuredUntil?: Date;
  specifications?: {
    [key: string]: string | number | boolean;
  };
  tags: string[];
  views: number;
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['real-estate', 'cars', 'watches', 'jewelry', 'art', 'yachts', 'private-jets', 'other'],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  videos: [String],
  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: String,
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected', 'sold'],
    default: 'draft',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  featuredUntil: Date,
  specifications: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  tags: [String],
  views: {
    type: Number,
    default: 0,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Create indexes
listingSchema.index({ category: 1, status: 1 });
listingSchema.index({ seller: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ featured: -1, createdAt: -1 });
listingSchema.index({ 'location.coordinates': '2dsphere' });
listingSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Listing: Model<IListing> = mongoose.models.Listing || mongoose.model<IListing>('Listing', listingSchema);

export default Listing;
