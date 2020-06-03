<div className={classNames('sidebar', { 'is-open': isOpen })}>
      <div className='sidebar-header'>
        <span color='info' onClick={toggle} style={{ color: '#fff' }}>
          &times;
        </span>
        <h3>Bootstrap Sidebar</h3>
      </div>
      <div className='side-menu'>
        <Nav vertical className='list-unstyled bg-dark'>
          <p>Dummy Heading</p>
          <SubMenu title='Home' icon={faHome} items={submenus[0]} />
          <NavItem>
            <NavLink tag={Link} to={'/about'}>
              <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
              About
            </NavLink>
          </NavItem>
          <SubMenu title='Pages' icon={faCopy} items={submenus[1]} />
          <NavItem>
            <NavLink tag={Link} to={'/pages'}>
              <FontAwesomeIcon icon={faImage} className='mr-2' />
              Portfolio
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/faq'}>
              <FontAwesomeIcon icon={faQuestion} className='mr-2' />
              FAQ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/contact'}>
              <FontAwesomeIcon icon={faPaperPlane} className='mr-2' />
              Contact
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>



<div className='sidebar'>
<div className='sidebar-header'>
  <h3>Bootstrp Sidebar</h3>
</div>

<ListGroup>
  <ListGroupItem>
    <NavLink tag={Link} to={'/dashboard'}>
      <FontAwesomeIcon icon={faHome} className='mr-2' />
      Portfolio
    </NavLink>
  </ListGroupItem>
  <ListGroupItem>
    <NavLink tag={Link} to={'/pages'}>
      <FontAwesomeIcon icon={faHome} className='mr-2' />
      Portfolio
    </NavLink>
  </ListGroupItem>
</ListGroup>
</div>