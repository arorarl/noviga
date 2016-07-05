from app import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    name = db.Column(db.String)
    
    created_on = db.Column(db.String)
    
    description = db.Column(db.String)
    

    def to_dict(self):
        return dict(
            name = self.name,
            created_on = self.created_on,
            description = self.description,
            id = self.id
        )

    def __repr__(self):
        return '<Project %r>' % (self.id)
