import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../copmponents/modal';
import axios from 'axios';

// import { productData } from '../data';
import { bootsEndpoint } from './api';
import styles from './products.module.css';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boots: [],
      error: '',
      adding: false,
      modal: {
        show: false,
        id: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
      },
    };
  }

  async componentDidMount() {
    try {
      const boots = await axios.get(bootsEndpoint);
      this.setState({ boots: boots.data });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  }

  onConfirmDel = async (productID) => {
    try {
      await axios.delete(bootsEndpoint + '/' + productID);
      let boots = [...this.state.boots];
      boots = boots.filter((boot) => boot.id !== productID);
      this.setState({ boots: boots });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  };

  onCancelDel = () => {
    console.log('canceled');
  };

  remove = (productID) => {
    window.confirm('Are you sure you wish to delete this item?')
      ? this.onConfirmDel(productID)
      : this.onCancelDel();
  };

  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
    this.modalClose();
  }

  modalOpen({ id, name, description, image, price }) {
    this.setState({
      modal: {
        show: true,
        id: id,
        name: name,
        description: description,
        image: image,
        price: price,
      },
    });
  }
  async handleEditSubmit({ id, name, description, image, price }) {
    try {
      await axios.put(bootsEndpoint + '/' + id, {
        id,
        name,
        description,
        image,
        price,
      });
      const boots = [...this.state.boots];

      const updatedBoots = boots.map((boot) => {
        return boot.id === id ? { id, name, description, image, price } : boot;
      });

      this.setState({ boots: [...updatedBoots], modal: { show: false } });
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  }

  modalClose() {
    if (this.state.adding) {
      this.remove(this.state.boots[this.state.boots.length - 1].id);
    }
    this.setState({
      modal: { show: false },
      adding: false,
    });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    console.log(name, value);
    this.setState((prevState) => {
      return {
        modal: {
          ...prevState.modal,
          [name]: value,
        },
      };
    });
  }

  async handleCreateNew(e) {
    try {
      const boots = await axios.post(bootsEndpoint, {
        name: '',
        description: '',
        image: 'http://loremflickr.com/640/480/fashion/?random=' + Date.now(),
        price: 0,
      });
      this.setState((prevState) => {
        return { boots: [...prevState.boots, boots.data], adding: true };
      });
      this.modalOpen(boots.data);
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  }
  render() {
    return (
      <div className={styles.productsContainer}>
        {this.state.boots.map((product) => (
          <div key={product.id} className={styles.card}>
            <NavLink key={product.id} to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </NavLink>
            <h5>{product.name}</h5>
            <p className={styles.price}>${product.price}</p>
            <p>{product.description}</p>
            <div>
              <button
                style={{ marginRight: '5px' }}
                type='button'
                className='btn btn-danger'
                onClick={() => {
                  this.remove(product.id);
                }}
              >
                REMOVE
              </button>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => this.modalOpen(product)}
              >
                EDIT
              </button>
            </div>
          </div>
        ))}

        <Modal
          show={this.state.modal.show}
          handleClose={(e) => this.modalClose(e)}
        >
          <h2>Edit Product</h2>

          <div className='form-group'>
            <label>Product Name:</label>
            <input
              type='text'
              value={this.state.modal.name ?? ''}
              name='name'
              onChange={(e) => this.handleChange(e)}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label>Description:</label>
            <textarea
              type='text'
              value={this.state.modal.description ?? ''}
              name='description'
              onChange={(e) => this.handleChange(e)}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label>Product Price:</label>
            <input
              type='text'
              value={this.state.modal.price ?? 0}
              name='price'
              onChange={(e) => this.handleChange(e)}
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <button
              onClick={(e) => this.handleEditSubmit(this.state.modal)}
              type='button'
            >
              Save
            </button>
          </div>
        </Modal>
        <button
          type='button'
          onClick={(e) => this.handleCreateNew()}
          className={'btn btn-primary ' + styles.fixed}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='64'
            height='64'
            fill='currentColor'
            className='bi bi-plus'
            viewBox='0 0 16 16'
          >
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
          </svg>
        </button>
      </div>
    );
  }
}

export default Products;
