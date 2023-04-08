import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onCloseModal);
  }

  onCloseModal = evt => {
    const { code, target, currentTarget } = evt;
    if (code === 'Escape' || target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.onCloseModal}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
