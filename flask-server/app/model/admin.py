from app import db

class Admin(db.Model):
    username = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return '<Admin {}>'.format(self.name)